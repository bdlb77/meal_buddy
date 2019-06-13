const eventSwipe = () => {
	const arrowRight = document.querySelector('.fas.fa-angle-double-right');
	const arrowLeft = document.querySelector('.fas.fa-angle-double-left');
	let cards = document.querySelectorAll('.event__card');
	const parentNode = document.querySelector('.event__cards');

	arrowRight.addEventListener('click', event => {
		let first = parentNode.firstChild;
		first.style.transform = `translateX(100px)`;
		setTimeout(() => {
			parentNode.removeChild(first);
			parentNode.appendChild(first);
			first.style.transform = `translateX(0)`;
		}, 200);
	});

	arrowLeft.addEventListener('click', event => {
		let last = parentNode.lastChild;
		let first = parentNode.firstChild;
		last.style.transform = `translate(-100px, 50px)`;
		setTimeout(() => {
			last.style.transform = `translate(0, 0)`;
			parentNode.removeChild(last);
			parentNode.insertBefore(last, first);
		}, 200);
	});
};
export default eventSwipe;
