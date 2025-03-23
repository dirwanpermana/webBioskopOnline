const swiper3 = new Swiper('.swiper-popular', {
    slidesOffsetAfter: 20,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    slidesPerView: "auto",
});

function openFilter(){
    const filter = document.getElementById('Filter-Sidebar');
    const body = document.getElementsByTagName("body")[0];

    filter.classList.toggle("!left-auto");
    body.classList.toggle("overflow-hidden")
};