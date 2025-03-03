// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // LINE Share functionality
    const lineShareButton = document.getElementById('lineShare');
    const referrerNameInput = document.getElementById('referrerName');
    const messageTextarea = document.getElementById('message');

    if (lineShareButton) {
        lineShareButton.addEventListener('click', function(e) {
            e.preventDefault();
            const referrerName = referrerNameInput.value.trim();
            if (!referrerName) {
                alert('お名前を入力してください。');
                referrerNameInput.focus();
                return;
            }

            const message = messageTextarea.value;
            const lineUrl = `https://page.line.me/862rmedt`;
            const shareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message + '\n' + lineUrl)}`;
            window.open(shareUrl, '_blank');
        });
    }

    // URL Copy functionality
    const copyLinkButton = document.getElementById('copyLink');
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function() {
            const referrerName = referrerNameInput.value.trim();
            if (!referrerName) {
                alert('お名前を入力してください。');
                referrerNameInput.focus();
                return;
            }

            const message = messageTextarea.value;
            const lineUrl = 'https://page.line.me/862rmedt';
            const fullMessage = `${message}\n${lineUrl}`;

            navigator.clipboard.writeText(fullMessage)
                .then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> コピーしました！';
                    this.classList.add('copied');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('テキストのコピーに失敗しました。');
                });
        });
    }

    // Auto-resize textarea
    if (messageTextarea) {
        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }

        messageTextarea.addEventListener('input', autoResize);
        // Initial resize
        autoResize.call(messageTextarea);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.benefit-box, .reason-card, .benefit-detail-card, .step').forEach(el => {
        observer.observe(el);
    });
});
