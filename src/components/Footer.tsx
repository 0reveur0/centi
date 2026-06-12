const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} WenZi – Chinese Dictionary for Vietnamese Learners</p>
      </div>
    </footer>
  );
};

export default Footer;
