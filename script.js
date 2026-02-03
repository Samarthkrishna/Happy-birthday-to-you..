// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✨ Magical Birthday Wonderland Loading...");
    
    // Initialize view count
    let viewCount = localStorage.getItem('magicViews') || 0;
    viewCount++;
    localStorage.setItem('magicViews', viewCount);
    document.getElementById('viewCount').textContent = viewCount;
    
    // Initialize music
    const birthdayMusic = document.getElementById('birthdayMusic');
    const celebrationSound = document.getElementById('celebrationSound');
    birthdayMusic.volume = 0.3;
    
    // Start countdown
    startBirthdayCountdown();
    
    // Auto start some animations
    setTimeout(() => {
        createSparkles();
        playSubtleSound();
    }, 1000);
    
    console.log("✅ Magic loaded successfully!");
});

// ===== COUNTDOWN TIMER =====
function startBirthdayCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Set target to next day midnight
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(0, 0, 0, 0);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Add pulse effect to seconds
            secondsElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsElement.style.transform = 'scale(1)';
            }, 300);
        } else {
            // Reset to next day
            targetDate.setDate(targetDate.getDate() + 1);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== PERSONALIZATION =====
function personalizeWish() {
    const name = document.getElementById('userName').value.trim();
    const messageElement = document.getElementById('birthdayMessage');
    
    if (name) {
        // Personalized messages
        const messages = [
            `Happy Birthday, ${name}! 🎉 May your day be filled with endless joy, laughter, and magical moments that create memories to last a lifetime.`,
            `To the incredible ${name}, may your birthday be as wonderful as you are! Wishing you a year filled with success, happiness, and all your heart's desires.`,
            `${name}, today the stars shine brighter because it's your birthday! May this special day bring you infinite blessings and unforgettable moments.`,
            `Celebrating you today, ${name}! May your birthday be the beginning of a year filled with good luck, good health, and much happiness.`,
            `Dear ${name}, on your special day, I wish you endless smiles, wonderful surprises, and a heart full of joy. Happy Birthday! ✨`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        messageElement.innerHTML = `<p>${randomMessage}</p>`;
        
        // Update title
        document.querySelector('.word1').textContent = `HAPPY`;
        document.querySelector('.word2').textContent = `BIRTHDAY`;
        document.querySelector('.word3').textContent = `${name.toUpperCase()} ✨`;
        
        // Create magical effect
        createMagicSparkles();
        playCelebrationSound();
        
        // Show success message
        showNotification(`✨ Personalized for ${name}! ✨`);
    } else {
        showNotification("Please enter your magical name first! ✨");
        document.getElementById('userName').focus();
    }
}

// ===== CANDLE FUNCTIONS =====
function blowCandle(candleId) {
    const candle = document.querySelector(`.candle[data-id="${candleId}"]`);
    
    if (candle && !candle.classList.contains('blown')) {
        candle.classList.add('blown');
        
        // Create flame particles
        createFlameParticles(candle);
        
        // Play blow sound
        playBlowSound();
        
        // Check if all candles are blown
        const allCandles = document.querySelectorAll('.candle');
        const allBlown = Array.from(allCandles).every(c => c.classList.contains('blown'));
        
        if (allBlown) {
            setTimeout(() => {
                showNotification("🎉 You made a wish! It will come true! 🎉");
                createConfettiStorm();
                playCelebrationSound();
                
                // Reset candles after 5 seconds
                setTimeout(() => {
                    allCandles.forEach(c => c.classList.remove('blown'));
                }, 5000);
            }, 500);
        }
    }
}

function blowAllCandles() {
    const candles = document.querySelectorAll('.candle');
    let delay = 0;
    
    candles.forEach((candle, index) => {
        setTimeout(() => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                createFlameParticles(candle);
            }
        }, delay);
        delay += 200;
    });
    
    setTimeout(() => {
        showNotification("🎂 All candles blown! Make a wish! 🎂");
        createConfettiStorm();
        playCelebrationSound();
    }, delay + 500);
}

// ===== CELEBRATION FUNCTIONS =====
function launchCelebration() {
    createConfettiStorm();
    createConfettiStorm();
    createMagicSparkles();
    playCelebrationSound();
    
    // Add party effects
    document.body.classList.add('party-mode');
    setTimeout(() => {
        document.body.classList.remove('party-mode');
    }, 3000);
    
    showNotification("🎊 Celebration launched! Let's party! 🎊");
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const birthdayMusic = document.getElementById('birthdayMusic');
    
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        musicBtn.classList.add('playing');
        showNotification("🎵 Birthday music playing! 🎵");
    } else {
        birthdayMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i> Play Music';
        musicBtn.classList.remove('playing');
        showNotification("🎵 Music paused 🎵");
    }
}

// ===== SURPRISE FUNCTION =====
function openSurprise() {
    const surpriseContent = document.getElementById('surpriseContent');
    const surprises = [
        "🎁 SURPRISE! You're amazing! Here's a virtual gift of endless happiness!",
        "✨ MAGIC REVEALED: Today is filled with special moments just for you!",
        "🎂 BIRTHDAY TREAT: You deserve all the wonderful things life has to offer!",
        "💝 HEARTFELT WISH: May your year be as bright and beautiful as you are!",
        "🌟 STAR GIFT: A constellation has been named in your honor today!"
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    surpriseContent.innerHTML = `<p>${randomSurprise}</p>`;
    
    // Animate box opening
    const boxLid = document.querySelector('.box-lid');
    boxLid.style.transform = 'rotateX(-90deg)';
    
    // Create surprise effects
    createSparkleBurst();
    playCelebrationSound();
    
    // Reset lid after 5 seconds
    setTimeout(() => {
        boxLid.style.transform = 'rotateX(0deg)';
    }, 5000);
}

// ===== SHARING =====
function shareMagic() {
    const shareText = "🎂 Check out this magical birthday wonderland! Experience the ultimate birthday celebration! ✨";
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Magical Birthday Wonderland',
            text: shareText,
            url: shareUrl
        });
    } else {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showNotification("🔗 Link copied to clipboard! Share the magic! ✨");
        });
    }
}

function resetMagic() {
    // Reset candles
    document.querySelectorAll('.candle').forEach(candle => {
        candle.classList.remove('blown');
    });
    
    // Reset name input
    document.getElementById('userName').value = '';
    
    // Reset message
    document.getElementById('birthdayMessage').innerHTML = 
        '<p>Today marks the beginning of another incredible journey around the sun. May your birthday be as wonderful, magical, and extraordinary as you are!</p>';
    
    // Reset title
    document.querySelector('.word1').textContent = 'HAPPY';
    document.querySelector('.word2').textContent = 'BIRTHDAY';
    document.querySelector('.word3').textContent = '✨';
    
    // Reset surprise box
    document.getElementById('surpriseContent').innerHTML = '<p>Click for a birthday surprise! 🎁</p>';
    document.querySelector('.box-lid').style.transform = 'rotateX(0deg)';
    
    // Create reset effect
    createSparkleBurst();
    showNotification("✨ Magic reset! Experience it again! ✨");
}

// ===== VISUAL EFFECTS =====
function createConfettiStorm() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6bcb', '#6b7bff', '#b56bff', '#ffd166', '#00ffc6'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            confettiContainer.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 15);
    }
}

function createMagicSparkles() {
    const container = document.getElementById('confettiContainer');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = Math.random() * 30 + 20 + 'px';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.zIndex = '9999';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.opacity = '0.8';
            
            container.appendChild(sparkle);
            
            const animation = sparkle.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                { transform: 'scale(1) rotate(180deg)', opacity: 1 },
                { transform: 'scale(0) rotate(360deg)', opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'ease-in-out'
            });
            
            animation.onfinish = () => sparkle.remove();
        }, i * 100);
    }
}

function createFlameParticles(candle) {
    const rect = candle.getBoundingClientRect();
    const colors = ['#ff9900', '#ffcc00', '#ff3300'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = rect.left + rect.width/2 + 'px';
            particle.style.top = rect.top + 'px';
            particle.style.zIndex = '9999';
            particle.style.pointerEvents = 'none';
            particle.style.boxShadow = '0 0 15px #ff9900';
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 40;
            
            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600 + Math.random() * 400,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }, i * 50);
    }
}

function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '20px';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = '100vh';
        sparkle.style.zIndex = '9998';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.opacity = '0.6';
        
        document.body.appendChild(sparkle);
        
        const animation = sparkle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.6 },
            { transform: `translateY(-${window.innerHeight}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-in-out'
        });
        
        animation.onfinish = () => sparkle.remove();
    }, 500);
}

function createSparkleBurst() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createMagicSparkles();
        }, i * 100);
    }
}

// ===== AUDIO FUNCTIONS =====
function playCelebrationSound() {
    const sound = document.getElementById('celebrationSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Audio error:", e));
}

function playSubtleSound() {
    // Could add more subtle sounds here
    console.log("🔊 Subtle magic sounds playing");
}

function playBlowSound() {
    // Simulate blow sound with a short beep
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 500;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ===== NOTIFICATION =====
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✨</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 15px 30px;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100px); opacity: 0; }
    }
    
    .party-mode {
        animation: partyColors 0.5s infinite;
    }
    
    @keyframes partyColors {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(notificationStyle);

// ===== INITIAL SPARKLES =====
window.onload = function() {
    createSparkles();
    
    // Auto start music after 2 seconds if user interacts
    setTimeout(() => {
        const birthdayMusic = document.getElementById('birthdayMusic');
        birthdayMusic.play().then(() => {
            birthdayMusic.pause();
            birthdayMusic.currentTime = 0;
        }).catch(e => {
            // Auto-play prevented, will play on user interaction
        });
    }, 2000);
};
