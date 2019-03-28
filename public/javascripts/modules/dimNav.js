import { $ } from './bling';

const dimNav = () => {
	const navbar = $('nav.nav');
	const location = window.location.pathname.includes('map');

	location ? navbar.classList.add('dim__nav') : navbar.classList.remove('dim__nav');
};

export default dimNav;
