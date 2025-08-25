export default function Footer(){
    return(
        <footer className="bg-black/50 px-8 py-12 mt-16">
        <div className="grid grid-cols-4 gap-8 max-w-6xl">
          <div>
            <h4 className="text-white font-semibold mb-4">Download our App</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                <span className="text-gray-400">Get it on Google Play</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                <span className="text-gray-400">Download on App Store</span>
              </div>
            </div>
          </div>
         
          <div>
            <div>
            <h2 className="text-white mb-2 text-sm">Navigation</h2>
            <ul>
              {[
                "Home",
                "Movies",
                "Series",
                "Documentary",
              ].map((item) => (
                <li key={item} className=" block text-gray-400 ">
                  <a
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className=" hover:text-[#FEAF23] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div>
          <div>
            <h2 className="text-white mb-2 text-sm">Legal</h2>
            <ul>
              {[
                "Terms of Use",
                "Privacy Policy",
                "Security",
              ].map((item) => (
                <li key={item} className=" block text-gray-400 ">
                  <a
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className=" hover:text-[#FEAF23] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div>
            <h2 className="text-white mb-2 text-sm">Contact Support</h2>
            <ul>
              {[
                "FAQ",
                "Contact Us",
                "Live Chat",
              ].map((item) => (
                <li key={item} className=" block text-gray-400">
                  <a
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className=" hover:text-[#FEAF23] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; 2025 Moovie. All Rights Reserved.
          </p>
        </div>
      </footer>
    )
}