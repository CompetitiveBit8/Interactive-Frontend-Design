
document.addEventListener("DOMContentLoaded", function(){
    //Mobile Sidebar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar')
    const mobileOverlay = document.getElementById('mobileOverlay')

    menuToggle.addEventListener('click', function(){
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');

        //Change icon based on state
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars')
        }
    });
    //Close sidebar when clicking on overlay
    mobileOverlay.addEventListener('click', function(){
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');

        //Change icon back to bars
        const icon = menuToggle.querySelector('i')
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars')
    });

    //Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');

        //Update icon and save preference
        const themeIcon = this.querySelector('i')
        if (document.body.classList.contains('dark-mode')){
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark')
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light')
        }
    });
    //Close sidebar when clicking on mobile
    document.addEventListener('click', function(e){
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (sidebar.classList.contains('active')&&
    !isClickInsideSidebar &&
    !isClickOnToggle){
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');

        //Change icon back to bars
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars')
    }
    });

    //Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark'){
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    //Add hover effect to taskbar
    document.querySelectorAll('.task-bar').forEach(task=>{
        task.addEventListener('mouseenter', function(){
            this.style.zIndex = '10';
        });
        task.addEventListener('mouseleave', function(){
            this.style.zIndex = "1";
        });
    });

    //Animate progress rings
    document.querySelectorAll('.progress-ring.progress-fill').forEach(ring=>{
        const circumfrence  = 283; //2*pie*r
        const progressRing = ring.closest('.progress-ring');
        const progressText = progressRing.querySelector('.progress-text').textContent;
        const percentage = parseInt(progressText);
        const offset = circumfrence - (percentage * circumfrence/ 100);
        ring.style.stokeDashoffset = offset 
    });

    const notificationBtn = document.getElementById('notification')
    const notificationCard = document.getElementById('notificationCard')
    const notificationBadge = document.getElementById('notificationBadge')
    
    //toggle popup when clicking bell
    notificationBtn.addEventListener('click', function (e) {
        e.stopPropagation(); //prevents closing immediately

        notificationCard.classList.toggle('active')
        notificationBadge.classList.remove('active')
    })
    //ensures disappearance of the card 
    document.addEventListener('click', function (e) {
        const isclickInside = notificationCard.contains(e.target);
        const isClickOnButton = notificationBtn.contains(e.target);

        if (!isclickInside && !isClickOnButton){
            notificationCard.classList.remove('active');
        }
    })
})
