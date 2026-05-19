
        // Navbar scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });

        // Mobile menu
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        hamburger.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        document.getElementById('mobileClose').addEventListener('click', closeMobile);
        function closeMobile() {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        // Lightbox
        function openLightbox(src) {
            document.getElementById('lightboxImg').src = src;
            document.getElementById('lightbox').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('open');
            document.body.style.overflow = '';
        }
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        // Menu filters
        let currentFilter = 'all';
        function setFilter(btn, cat) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = cat;
            filterProducts();
        }
        function filterProducts() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const matchCat = currentFilter === 'all' || card.dataset.cat === currentFilter;
                const matchSearch = !query || card.dataset.name.includes(query) || card.textContent.toLowerCase().includes(query);
                card.classList.toggle('hidden', !(matchCat && matchSearch));
            });
        }
        document.getElementById('searchInput').addEventListener('input', filterProducts);

        // Form submissions
        function submitOrder() {
            const nome = document.getElementById('nome').value.trim();
            const tel = document.getElementById('telefone').value.trim();
            const tipo = document.getElementById('tipo').value;
            const data = document.getElementById('data').value;
            if (!nome || !tel || !tipo || !data) {
                alert('Por favor, preencha os campos obrigatórios (Nome, WhatsApp, Tipo de Bolo e Data).');
                return;
            }
            const msg = encodeURIComponent(`Olá Glória! Me chamo ${nome} e gostaria de fazer uma encomenda:\n\n🎂 Tipo: ${tipo}\n📅 Data do evento: ${data}\n📞 Contato: ${tel}\n\nPodemos conversar?`);
            window.open(`https://wa.me/5585999999999?text=${msg}`, '_blank');
        }
        function submitContact() {
            const nome = document.getElementById('c_nome').value.trim();
            const msg = document.getElementById('c_msg').value.trim();
            if (!nome || !msg) {
                alert('Por favor, preencha seu nome e a mensagem.');
                return;
            }
            const wamsg = encodeURIComponent(`Olá! Me chamo ${nome} e gostaria de entrar em contato.\n\n${msg}`);
            window.open(`https://wa.me/5585999999999?text=${wamsg}`, '_blank');
        }

        // Scroll reveal
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(el => observer.observe(el));

        // Hero parallax
        window.addEventListener('scroll', () => {
            const bg = document.querySelector('.hero-bg');
            if (bg) bg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
        });
