const handleMobileMenu = (
  setIsMenuOpen: (callback: (oldMenuState: boolean) => boolean) => void
) => {
  if (window.innerWidth <= 700) {
    setIsMenuOpen((oldMenuState: boolean) => !oldMenuState);
    document.querySelector('.first')?.classList.toggle('close-left');
    document.querySelector('.second')?.classList.toggle('close-right');
    document.querySelector('.third')?.classList.toggle('fade');
    document.querySelector('body')?.classList.toggle('body-on-menu-active');
  }
};

export default handleMobileMenu;
