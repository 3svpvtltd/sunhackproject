class EduZenApp {
    constructor() {
        this.currentSection = 'home';
        this.userStats = {
            totalPoints: 1250,
            totalBadges: 8,
            lessonsCompleted: 23,
            currentLevel: 5
        };
        this.quizData = [
            {
                question: "What is 5 + 3?",
                options: ["6", "8", "9", "7"],
                correct: 1,
                subject: "math"
            },
            {
                question: "Which planet is closest to the Sun?",
                options: ["Earth", "Mars", "Mercury", "Venus"],
                correct: 2,
                subject: "science"
            },
            {
                question: "What color do you get when you mix red and blue?",
                options: ["Purple", "Green", "Orange", "Yellow"],
                correct: 0,
                subject: "art"
            },
            {
                question: "How many sides does a triangle have?",
                options: ["2", "3", "4", "5"],
                correct: 1,
                subject: "math"
            },
            {
                question: "What do plants need to make food?",
                options: ["Water only", "Sunlight only", "Water and sunlight", "Nothing"],
                correct: 2,
                subject: "science"
            }
        ];
        this.currentQuiz = 0;
        this.quizScore = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateFloatingElements();
        this.updateUserStats();
    }

    setupEventListeners() {
       

        // Mobile navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Subject cards
        document.querySelectorAll('.subject-card').forEach(card => {
            card.addEventListener('click', () => {
                const subject = card.dataset.subject;
                this.startSubjectLearning(subject);
            });
        });

        // Game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const game = card.dataset.game;
                this.startGame(game);
            });
        });


        // Featured game cards
        document.querySelectorAll('.featured-game-card').forEach(card => {
            card.addEventListener('click', () => {
                const game = card.dataset.game;
                this.startGame(game);
                this.showSection('games');
            });
        });


        // Quick contact form
//         document.getElementById('quickContactForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     try {
//         const response = await fetch('/getdata', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             this.showAchievement('Thank you! We\'ll contact you soon!', 0);
//             e.target.reset();
//         } else {
//             alert('Something went wrong, please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Server error. Please try again later.');
//     }
// });


        // CTA Button
        document.querySelector('.cta-button').addEventListener('click', () => {
            this.showSection('learn');
        });
    }

    showSection(sectionName) {
        

        // Close mobile menu
        document.getElementById('nav-menu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');

        this.currentSection = sectionName;
    }

    animateFloatingElements() {
        const floatingItems = document.querySelectorAll('.floating-item');
        floatingItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.5}s`;
            
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                item.style.transform += `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }

    updateUserStats() {
        document.getElementById('totalPoints').textContent = this.userStats.totalPoints.toLocaleString();
        document.getElementById('totalBadges').textContent = this.userStats.totalBadges;
        document.getElementById('lessonsCompleted').textContent = this.userStats.lessonsCompleted;
    }

    startSubjectLearning(subject) {
        this.showAchievement(`Started learning ${subject.charAt(0).toUpperCase() + subject.slice(1)}!`, 25);
        
        // Simulate lesson start
        setTimeout(() => {
            this.completeLesson(subject);
        }, 2000);
    }

    startGame(gameType) {
        if (gameType === 'quiz') {
            this.startQuiz();
        } else {
            this.showAchievement(`Started ${gameType} game!`, 10);
        }
    }

    startQuiz() {
        document.getElementById('quiz-game').style.display = 'block';
        document.querySelector('.games-grid').style.display = 'none';
        this.currentQuiz = 0;
        this.quizScore = 0;
        this.loadQuestion();
    }

    loadQuestion() {
        const question = this.quizData[this.currentQuiz];
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('quiz-score').textContent = this.quizScore;

        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        document.getElementById('next-question').style.display = 'none';
    }

    selectAnswer(selectedIndex) {
        const question = this.quizData[this.currentQuiz];
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
            option.disabled = true;
        });

        if (selectedIndex === question.correct) {
            this.quizScore += 20;
            document.getElementById('quiz-score').textContent = this.quizScore;
        }

        setTimeout(() => {
            this.currentQuiz++;
            if (this.currentQuiz < this.quizData.length) {
                this.loadQuestion();
            } else {
                this.endQuiz();
            }
        }, 1500);
    }

    endQuiz() {
        const finalScore = this.quizScore;
        this.userStats.totalPoints += finalScore;
        
        document.getElementById('question-text').textContent = `Quiz Complete! Your score: ${finalScore}/100`;
        document.getElementById('answer-options').innerHTML = '';
        
        if (finalScore >= 80) {
            this.showAchievement('Quiz Master! Great job!', finalScore);
        } else if (finalScore >= 60) {
            this.showAchievement('Good effort! Keep learning!', finalScore);
        } else {
            this.showAchievement('Keep practicing! You\'ll get better!', finalScore);
        }

        this.updateUserStats();
    }

    closeGame() {
        document.getElementById('quiz-game').style.display = 'none';
        document.querySelector('.games-grid').style.display = 'grid';
    }

    playVideo(videoType) {
        const videoData = {
            'math-basics': {
                title: 'Math Basics for Beginners',
                description: 'Learn fundamental math concepts including counting, addition, and subtraction in a fun and engaging way!',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            'science-fun': {
                title: 'Fun Science Experiments',
                description: 'Discover amazing science experiments that you can safely try at home with common household items.',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            'reading-stories': {
                title: 'Story Time Adventures',
                description: 'Join us for exciting story adventures that help improve reading skills and spark imagination.',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            'art-creative': {
                title: 'Creative Art Projects',
                description: 'Step-by-step art tutorials perfect for young artists to express their creativity.',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
        };

        const video = videoData[videoType];
        if (video) {
            document.getElementById('video-title').textContent = video.title;
            document.getElementById('video-desc').textContent = video.description;
            document.getElementById('video-player').src = video.url;
            document.getElementById('video-modal').style.display = 'flex';
        }
    }

    closeVideo() {
        document.getElementById('video-modal').style.display = 'none';
        document.getElementById('video-player').src = '';
    }

    completeLesson(subject) {
        const points = Math.floor(Math.random() * 50) + 25;
        this.userStats.totalPoints += points;
        this.userStats.lessonsCompleted++;
        
        this.showAchievement(`Lesson completed! +${points} points`, points);
        this.updateUserStats();
    }

    showAchievement(message, points = 0) {
        const popup = document.getElementById('achievement-popup');
        const text = document.getElementById('achievement-text');
        
        text.textContent = `${message} ${points > 0 ? `+${points} points!` : ''}`;
        popup.style.display = 'block';
        
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    closeAchievement() {
        document.getElementById('achievement-popup').style.display = 'none';
    }
}

// Global functions for HTML onclick handlers
window.showSection = function(section) {
    app.showSection(section);
};

window.closeGame = function() {
    app.closeGame();
};

window.closeVideo = function() {
    app.closeVideo();
};

window.closeAchievement = function() {
    app.closeAchievement();
};

window.handleContactForm = function(e) {
    app.handleContactForm(e);
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EduZenApp();
});

// Add smooth scrolling and enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.subject-card, .game-card, .video-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate progress bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.progress-card, .subject-card').forEach(card => {
        progressObserver.observe(card);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);