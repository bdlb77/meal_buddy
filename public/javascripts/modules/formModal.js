function formModal() {
	const modal = document.querySelector('.booking');
	const trigger = document.querySelector('.trigger');
	const closeModal = document.querySelector('.close-modal-button');
	if (modal) {
		function toggleModal() {
			modal.classList.toggle('show-modal');
		}

		const windowOnClick = e => {
			e.stopPropagation();
			console.log(e.target);
			if (e.target === modal) toggleModal();
		};

		trigger.addEventListener('click', toggleModal);
		closeModal.addEventListener('click', toggleModal);
		window.addEventListener('click', windowOnClick);
	}
}
export default formModal;
