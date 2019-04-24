function reviewFormAnimate() {
	const button = document.querySelector('#add__review');
	const reviewForm = document.querySelector('.review__wrap');
	const bookingForm = document.querySelector('.booking');

	if (button) {
		function handleForms(form) {
			function handleOneForm() {
				form.classList.toggle('review__form__animate');
			}
			const closeForm = e => {
				if (e.target === form && form.classList.contains('review__form__animate')) {
					form.classList.remove('review__form__animate');
				}
			};

			form.addEventListener('click', closeForm, true);
			button.addEventListener('click', handleOneForm);
		}
		if (reviewForm) handleForms(reviewForm);
		if (bookingForm) handleForms(bookingForm);
	}
}
export default reviewFormAnimate;
