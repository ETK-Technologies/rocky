// Start treatment section
(function () {
    const slider = document.querySelector('.box-container');
    const sliderBoxes = document.querySelectorAll('.box-container .box');
    const sliderBoxWidth = sliderBoxes[0].offsetWidth;
    let nextItem = 0;

    function autoScroll() {
        if (nextItem >= sliderBoxes.length) {
            nextItem = 0;
            slider.scrollLeft = 0;
        }

        requestAnimationFrame(() => {
            slider.scrollLeft += 1;

            if (slider.scrollLeft >= (sliderBoxWidth * sliderBoxes.length)) {
                slider.scrollLeft = 0;
            }

            nextItem++;
            autoScroll();
        });
    }

    autoScroll();
})();

// In news slider
(function () {
    const scrollContainer = document.querySelector('.in-news-slider');

    setInterval(() => {
        scrollContainer.scrollBy(1, 0);
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 2) {
            scrollContainer.scrollLeft = 0;
        }
    }, 30);
})();

// Most popular treatments
(function () {
    const arrows = {
        right: document.querySelectorAll('.right-arrow'),
        left: document.querySelectorAll('.left-arrow')
    };

    arrows.right.forEach(arrow => {
        arrow.addEventListener('click', () => {
            arrow.parentElement.nextElementSibling.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        });
    });

    arrows.left.forEach(arrow => {
        arrow.addEventListener('click', () => {
            arrow.parentElement.nextElementSibling.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        });
    });
})();


// FAQs area
(function () {
    document.querySelectorAll('.faq-accordion-title').forEach((title) => {
        const content = title.nextElementSibling;
        content.style.display = 'none';

        title.addEventListener('click', () => {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            title.firstElementChild.style.transform = isVisible ? 'rotateZ(270deg)' : 'rotateZ(90deg)';
        });
    });
})();

// Hide subscription message
document.querySelector("#subscription-message-button").addEventListener("click", (e) => {
    e.target.closest(".subscription-message").classList.add("hidden");
});

// Footer sections toggle
(function () {
    const toggleSection = (buttonSelector, sectionSelector, openedClass) => {
        const button = document.querySelector(buttonSelector);
        const section = document.querySelector(sectionSelector);

        button.addEventListener("click", () => {
            const isHidden = section.classList.contains(`${openedClass}-hidden`);
            section.classList.toggle(`${openedClass}-hidden`, !isHidden);
            button.classList.toggle("opened", isHidden);
        });
    };

    toggleSection(".contact-link.locations-btn", ".footer-container #locations", "locations");
    toggleSection(".footer-container .products-btn", ".footer-container #products", "products");
    toggleSection(".footer-container .learn-more-btn", ".footer-container #learn-more", "learn-more");
    toggleSection(".footer-container .contact-section-btn", ".footer-container #contact-section", "contact-section");
})();


// Start lazy loader



window.lazyLoadOptions = [{ elements_selector: "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]", data_src: "lazy-src", data_srcset: "lazy-srcset", data_sizes: "lazy-sizes", class_loading: "lazyloading", class_loaded: "lazyloaded", threshold: 300, callback_loaded: function (element) { if (element.tagName === "IFRAME" && element.dataset.rocketLazyload == "fitvidscompatible") { if (element.classList.contains("lazyloaded")) { if (typeof window.jQuery != "undefined") { if (jQuery.fn.fitVids) { jQuery(element).parent().fitVids() } } } } } }, { elements_selector: ".rocket-lazyload", data_src: "lazy-src", data_srcset: "lazy-srcset", data_sizes: "lazy-sizes", class_loading: "lazyloading", class_loaded: "lazyloaded", threshold: 300, }]; window.addEventListener('LazyLoad::Initialized', function (e) {
    var lazyLoadInstance = e.detail.instance; if (window.MutationObserver) {
        var observer = new MutationObserver(function (mutations) {
            var image_count = 0; var iframe_count = 0; var rocketlazy_count = 0; mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (typeof mutation.addedNodes[i].getElementsByTagName !== 'function') { continue }
                    if (typeof mutation.addedNodes[i].getElementsByClassName !== 'function') { continue }
                    images = mutation.addedNodes[i].getElementsByTagName('img'); is_image = mutation.addedNodes[i].tagName == "IMG"; iframes = mutation.addedNodes[i].getElementsByTagName('iframe'); is_iframe = mutation.addedNodes[i].tagName == "IFRAME"; rocket_lazy = mutation.addedNodes[i].getElementsByClassName('rocket-lazyload'); image_count += images.length; iframe_count += iframes.length; rocketlazy_count += rocket_lazy.length; if (is_image) { image_count += 1 }
                    if (is_iframe) { iframe_count += 1 }
                }
            }); if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) { lazyLoadInstance.update() }
        }); var b = document.getElementsByTagName("body")[0]; var config = { childList: !0, subtree: !0 }; observer.observe(b, config)
    }
}, !1);