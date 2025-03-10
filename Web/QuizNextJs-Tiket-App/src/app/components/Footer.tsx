export default function Footer() {
  return (
    <footer className="app_primary text-black p-6 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="font-bold text-lg">Evander Checked</h2>
          <ul className="mt-2 space-y-2">
            <li>✅ Landing Page</li>
            <li>✅ Sorting Ticket</li>
            <li>✅ Cors Connecting Database</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg">Our Company</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Affiliate Program</a></li>
            <li><a href="#" className="hover:underline">Corporate Service</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg">Contact</h2>
          <p>Email: <a href="mailto:nikolaibenevander@gmail.com" className="hover:underline">nikolaibenevander@gmail.com</a></p>
          <p>Phone: <a href="tel:+6282213128976" className="hover:underline">082213128976</a></p>
          <p>Position: Intern Fullstack at Accelist</p>
        </div>
      </div>
      
      <div className="text-center mt-6 border-t pt-4 text-sm">
        <p>Copyright © 2025 Viago GmbH</p>
        <p>
          Use of this website constitutes acceptance of the
          <a href="#" className="hover:underline"> Terms and Conditions</a>,
          <a href="#" className="hover:underline"> Privacy Policy</a>, and
          <a href="#" className="hover:underline"> Cookies Policy</a>.
        </p>
      </div>
    </footer>
  );
}
