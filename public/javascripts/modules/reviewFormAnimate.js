function reviewFormAnimate() {
	const button = document.querySelector('#add__review');
	const form = document.querySelector('.review__wrap');
	if (button) {
		function handleForm() {
			form.classList.toggle('review__form__animate');
		}
		const closeForm = e => {
			console.log(e.target);
			if (e.target === form && form.classList.contains('review__form__animate')) {
				form.classList.remove('review__form__animate');
			}
		};
		form.addEventListener('click', closeForm, true);
		button.addEventListener('click', handleForm);
	}
}
export default reviewFormAnimate;
