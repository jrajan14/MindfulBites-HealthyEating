// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Intent Banner Functionality
    const intentBanner = document.getElementById('intentBanner');
    const intentText = document.getElementById('intentText');
    const editIntentBtn = document.getElementById('editIntentBtn');
    const closeBannerBtn = document.getElementById('closeBannerBtn');
    const intentModal = document.getElementById('intentModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveIntentBtn = document.getElementById('saveIntentBtn');
    const customIntentInput = document.getElementById('customIntent');
    const saveCustomIntentBtn = document.getElementById('saveCustomIntent');
    
    let selectedIntent = "I eat to feel energized and stable.";
    
    // Set initial intent from localStorage or default
    const savedIntent = localStorage.getItem('mindfulBitesIntent');
    if (savedIntent) {
        selectedIntent = savedIntent;
        intentText.textContent = selectedIntent;
    }
    
    editIntentBtn.addEventListener('click', () => {
        intentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Mark the current intent as selected
        document.querySelectorAll('.intent-option').forEach(option => {
            option.classList.remove('selected');
            if (option.getAttribute('data-intent') === selectedIntent) {
                option.classList.add('selected');
            }
        });
        
        // Clear custom intent input
        customIntentInput.value = '';
    });
    
    closeBannerBtn.addEventListener('click', () => {
        intentBanner.style.display = 'none';
    });
    
    closeModalBtn.addEventListener('click', () => {
        intentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Intent option selection
    document.querySelectorAll('.intent-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.intent-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedIntent = this.getAttribute('data-intent');
            customIntentInput.value = '';
        });
    });
    
    // Save custom intent
    saveCustomIntentBtn.addEventListener('click', () => {
        const customIntent = customIntentInput.value.trim();
        if (customIntent) {
            selectedIntent = customIntent;
            
            // Deselect all preset options
            document.querySelectorAll('.intent-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }
    });
    
    // Save intent and close modal
    saveIntentBtn.addEventListener('click', () => {
        intentText.textContent = selectedIntent;
        localStorage.setItem('mindfulBitesIntent', selectedIntent);
        intentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Show confirmation animation
        intentBanner.style.animation = 'none';
        setTimeout(() => {
            intentBanner.style.animation = 'slideDown 0.5s ease-out';
        }, 10);
    });
    
    // CTA Button Functionality
    const imHungryBtn = document.getElementById('imHungryBtn');
    const imCravingBtn = document.getElementById('imCravingBtn');
    const notSureBtn = document.getElementById('notSureBtn');
    
    imHungryBtn.addEventListener('click', () => {
        scrollToSection('hunger-check');
        animateButtonClick(imHungryBtn);
    });
    
    imCravingBtn.addEventListener('click', () => {
        scrollToSection('hunger-check');
        animateButtonClick(imCravingBtn);
        
        // Auto-select "craving" emotion if user clicks this button
        setTimeout(() => {
            const cravingEmotion = document.querySelector('.emotion-option[data-value="bored"]');
            if (cravingEmotion) {
                selectEmotion(cravingEmotion);
            }
        }, 500);
    });
    
    notSureBtn.addEventListener('click', () => {
        scrollToSection('hunger-check');
        animateButtonClick(notSureBtn);
    });
    
    function animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Hunger Check Flow
    const hungerSlider = document.getElementById('hungerSlider');
    const hungerValue = document.getElementById('hungerValue');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    
    // Update slider value display
    hungerSlider.addEventListener('input', function() {
        hungerValue.textContent = this.value;
        
        // Animate the value change
        hungerValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            hungerValue.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Next/Back button functionality
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            goToStep(nextStep);
        });
    });
    
    document.querySelectorAll('.btn-back').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-back');
            goToStep(prevStep);
        });
    });
    
    function goToStep(stepId) {
        // Hide all steps
        document.querySelectorAll('.check-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the target step
        const targetStep = document.getElementById(stepId);
        targetStep.classList.add('active');
        
        // Scroll to the step
        targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Emotion selection
    let selectedEmotion = null;
    document.querySelectorAll('.emotion-option').forEach(option => {
        option.addEventListener('click', function() {
            selectEmotion(this);
        });
    });
    
    function selectEmotion(emotionElement) {
        // Deselect all emotions
        document.querySelectorAll('.emotion-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Select clicked emotion
        emotionElement.classList.add('selected');
        selectedEmotion = emotionElement.getAttribute('data-value');
    }
    
    // Time since last meal selection
    let selectedTime = null;
    document.querySelectorAll('.time-option').forEach(option => {
        option.addEventListener('click', function() {
            // Deselect all time options
            document.querySelectorAll('.time-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select clicked time option
            this.classList.add('selected');
            selectedTime = this.getAttribute('data-value');
        });
    });
    
    // Get Recommendation
    const getRecommendationBtn = document.getElementById('getRecommendationBtn');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const suggestionList = document.getElementById('suggestionList');
    
    getRecommendationBtn.addEventListener('click', function() {
        // Get values
        const hungerLevel = parseInt(hungerSlider.value);
        const emotion = selectedEmotion || 'calm';
        const time = selectedTime || '2';
        
        // Determine recommendation based on logic
        let recommendation = {};
        
        if (hungerLevel >= 7 && (time === '3' || time === '4')) {
            // Very hungry and it's been a while
            recommendation = {
                title: "Eat Now",
                description: "Your body is giving strong hunger signals and it's been a while since you last ate. Choose a balanced meal with protein, fiber, and healthy fats.",
                icon: "fas fa-utensils",
                iconColor: "#51CF66",
                suggestions: [
                    "Choose a protein-rich option (chicken, fish, tofu)",
                    "Include vegetables or salad",
                    "Add a source of healthy fats (avocado, nuts)",
                    "Eat slowly and check in with fullness"
                ]
            };
        } else if (hungerLevel <= 3 && (emotion === 'stressed' || emotion === 'bored' || emotion === 'sad')) {
            // Not very hungry but emotional eating cues
            recommendation = {
                title: "Pause & Redirect",
                description: "You're experiencing emotional hunger rather than physical hunger. Try a brief activity before deciding to eat.",
                icon: "fas fa-hourglass-half",
                iconColor: "#FF922B",
                suggestions: [
                    "Drink a glass of water",
                    "Take 5 deep breaths",
                    "Go for a 5-minute walk",
                    "Wait 15 minutes and check in again"
                ]
            };
        } else {
            // Middle ground - mindful eating
            recommendation = {
                title: "Eat Mindfully",
                description: "You're experiencing moderate hunger but might also be influenced by emotions or context. Take a moment to eat slowly and check in with your fullness signals.",
                icon: "fas fa-brain",
                iconColor: "#9D7BFF",
                suggestions: [
                    "Drink a glass of water before eating",
                    "Choose a protein-rich option",
                    "Eat without distractions",
                    "Pause halfway to check fullness"
                ]
            };
        }
        
        // Apply the recommendation
        resultIcon.innerHTML = `<i class="${recommendation.icon}"></i>`;
        resultIcon.style.color = recommendation.iconColor;
        resultTitle.textContent = recommendation.title;
        resultDescription.textContent = recommendation.description;
        
        // Clear and populate suggestions
        suggestionList.innerHTML = '';
        recommendation.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionList.appendChild(li);
        });
        
        // Go to result step
        goToStep('step4');
        
        // Update progress stats
        updateProgressStats();
    });
    
    // Start Over button
    const startOverBtn = document.getElementById('startOverBtn');
    startOverBtn.addEventListener('click', function() {
        // Reset all values
        hungerSlider.value = 5;
        hungerValue.textContent = '5';
        selectedEmotion = null;
        selectedTime = null;
        
        // Deselect all options
        document.querySelectorAll('.emotion-option, .time-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Go back to step 1
        goToStep('step1');
    });
    
    // Save Result button
    const saveResultBtn = document.getElementById('saveResultBtn');
    saveResultBtn.addEventListener('click', function() {
        // In a real app, this would save to a database
        // For now, we'll just show a confirmation
        saveResultBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        saveResultBtn.style.backgroundColor = '#51CF66';
        
        setTimeout(() => {
            saveResultBtn.innerHTML = 'Save This Result';
            saveResultBtn.style.backgroundColor = '';
        }, 2000);
        
        // Update progress
        updateProgressStats();
    });
    
    // Environment Selector
    const environmentOptions = document.querySelectorAll('.env-option');
    const environmentTips = document.getElementById('environmentTips');
    
    const environmentData = {
        cafeteria: {
            title: "Cafeteria Tips:",
            tips: [
                "Scan all options before choosing",
                "Look for the simplest preparation methods",
                "Fill half your plate with vegetables when available",
                "Choose water as your beverage",
                "If desserts are tempting, decide in advance if you'll have one"
            ]
        },
        office: {
            title: "Office Pantry Tips:",
            tips: [
                "Bring your own healthy snacks to avoid temptation",
                "Keep a water bottle at your desk",
                "If donuts are present, take just half or a small portion",
                "Opt for tea or black coffee instead of sugary drinks",
                "Take a walk before grabbing a snack"
            ]
        },
        foodcourt: {
            title: "Food Court Tips:",
            tips: [
                "Walk the entire court before deciding",
                "Look for grilled or steamed options",
                "Ask for sauces and dressings on the side",
                "Choose a place that offers vegetable sides",
                "Share a larger portion with a friend"
            ]
        },
        hospital: {
            title: "Hospital Tips:",
            tips: [
                "Focus on hydration - stress can mask as hunger",
                "Choose simple, easy-to-digest foods",
                "Pack your own snacks if possible",
                "Opt for broth-based soups when available",
                "Be kind to yourself - this is a stressful environment"
            ]
        }
    };
    
    environmentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            environmentOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get environment type
            const envType = this.getAttribute('data-env');
            
            // Update tips
            const envData = environmentData[envType];
            if (envData) {
                environmentTips.innerHTML = `
                    <h5><i class="fas fa-lightbulb"></i> ${envData.title}</h5>
                    <ul>
                        ${envData.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                `;
            }
        });
    });
    
    // Digital Defense Mode
    const digitalDefenseBtn = document.getElementById('digitalDefenseBtn');
    const digitalDefenseOverlay = document.getElementById('digitalDefenseOverlay');
    const closeDefenseBtn = document.getElementById('closeDefenseBtn');
    
    digitalDefenseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        digitalDefenseOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeDefenseBtn.addEventListener('click', function() {
        digitalDefenseOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Smart Swaps Modal
    const smartSwapsBtn = document.getElementById('smartSwapsBtn');
    const swapsModal = document.getElementById('swapsModal');
    const closeSwapsBtn = document.getElementById('closeSwapsBtn');
    
    smartSwapsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        swapsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeSwapsBtn.addEventListener('click', function() {
        swapsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === intentModal) {
            intentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (e.target === swapsModal) {
            swapsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (e.target === digitalDefenseOverlay) {
            digitalDefenseOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Reflection Options
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.addEventListener('click', function() {
            // Animate the selection
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Update progress
            updateProgressStats();
            
            // Show a thank you message
            const reflectionNote = document.querySelector('.reflection-note');
            const originalText = reflectionNote.textContent;
            reflectionNote.textContent = "Thank you for your reflection! Awareness is the first step.";
            reflectionNote.style.color = "#51CF66";
            
            setTimeout(() => {
                reflectionNote.textContent = originalText;
                reflectionNote.style.color = "";
            }, 3000);
        });
    });
    
    // Progress Stats
    function updateProgressStats() {
        // Increment mindful decisions
        const mindfulCount = document.getElementById('mindfulCount');
        let currentCount = parseInt(mindfulCount.textContent);
        mindfulCount.textContent = currentCount + 1;
        
        // Animate the number change
        mindfulCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            mindfulCount.style.transform = 'scale(1)';
        }, 300);
        
        // Update alignment score (random-ish but generally positive)
        const alignmentScore = document.getElementById('alignmentScore');
        let currentScore = parseInt(alignmentScore.textContent);
        let newScore = Math.min(100, currentScore + Math.floor(Math.random() * 5));
        alignmentScore.textContent = newScore + '%';
        
        // Update progress bar
        const alignmentBar = document.querySelector('.progress-card:nth-child(2) .progress-fill');
        alignmentBar.style.width = newScore + '%';
        
        // Update pause time
        const pauseTime = document.getElementById('pauseTime');
        let currentTime = parseInt(pauseTime.textContent);
        let newTime = currentTime + Math.floor(Math.random() * 10);
        pauseTime.textContent = newTime + 's';
        
        // Update progress bar
        const pauseBar = document.querySelector('.progress-card:nth-child(3) .progress-fill');
        const pausePercent = Math.min(100, (newTime / 120) * 100);
        pauseBar.style.width = pausePercent + '%';
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // For internal links, scroll smoothly
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const correspondingNavItem = document.querySelector(`.nav-item a[href="#${sectionId}"]`)?.parentElement;
            if (correspondingNavItem) {
                correspondingNavItem.classList.add('active');
            }
        }
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section, .progress-card, .map-step').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize with some random progress
    setTimeout(() => {
        updateProgressStats();
    }, 1000);
});