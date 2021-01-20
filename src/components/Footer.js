function Footer() {
  const time = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p className='footer--copyright'>© Jon Telles {time}</p>
      <p className='footer--blurb'>🙃 Made by a human being 🙃</p>
    </footer>
  );
}

export default Footer;
