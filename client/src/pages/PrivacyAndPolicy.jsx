import React from 'react';
import Navigation from '../components/Navigation';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Navigation></Navigation>
      <div className="max-w-[1350px] mx-auto px-4 sm:px-10 pt-24 lg:pt-32 pb-16">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Effective date: October 22, 2025</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {/* Introduction */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold flex-shrink-0">1</span>
              Introduction
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to Kloudshark ("we," "us," or "our"). We operate the website{' '}
                <a href="https://blog-website-8yru.vercel.app/" className="text-blue-600 hover:underline font-medium">
                  blog-website-8yru.vercel.app
                </a>{' '}
                (the "Site"), which is an informational blog.
              </p>
              <p>
                Your privacy is important to us. This Privacy Policy explains how we handle information when you visit our Site.
              </p>
              <p className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                Our Site is designed for informational purposes only. <strong>Users can only read content.</strong> There are no features for user registration, user accounts, commenting, or direct messaging. Because of this, we do not require you to provide, nor do we knowingly collect, any Personal Information like your name, email address, or phone number.
              </p>
            </div>
          </section>

          {/* Information Collection */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold flex-shrink-0">2</span>
              Information We Collect Automatically
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Like most websites, when you visit our Site, our servers may automatically collect certain non-personal information. This information does not identify you personally and is used for analytics and site security.
              </p>
              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-purple-400">
                  <h3 className="font-bold text-gray-900 mb-2">Log Files</h3>
                  <p>
                    Our web server may automatically log standard information such as your IP (Internet Protocol) address, browser type, operating system, the pages you visited, and the dates/times of your visit. We use this information to analyze trends, administer the site, and ensure its security.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-purple-400">
                  <h3 className="font-bold text-gray-900 mb-2">Cookies</h3>
                  <p>
                    We may use cookies (small text files stored on your device) to help us understand how our audience uses the Site. For example, we may use analytics tools (like Google Analytics) to see which blog posts are popular and how many visitors we receive. You can disable cookies in your browser settings, though this may affect your experience on some websites.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold flex-shrink-0">3</span>
              How We Use Your Information
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>We use the non-personal information we collect for the following purposes:</p>
              <div className="grid gap-3 mt-4">
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>To operate, maintain, and secure our Site.</span>
                </div>
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>To analyze usage and trends, which helps us improve our content and user experience.</span>
                </div>
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>To monitor and prevent fraud, spam, or other malicious activity.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Disclosure */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold flex-shrink-0">4</span>
              Disclosure of Information
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                We do not sell, rent, or trade any information with third parties. We may only share the anonymous, non-personal data we collect in the following limited circumstances:
              </p>
              <div className="space-y-4 mt-4">
                <div className="bg-orange-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Service Providers</h3>
                  <p>With third-party vendors who provide services on our behalf, such as web hosting and analytics.</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Legal Requirements</h3>
                  <p>If required to do so by law or in response to a valid legal request, such as a court order or subpoena.</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Business Transfer</h3>
                  <p>If Kloudshark is involved in a merger, acquisition, or sale of all or a portion of its assets, the anonymous data we have collected may be transferred as part of that transaction.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Remaining Sections */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold flex-shrink-0">5</span>
              Third-Party Links
            </h2>
            <div className="ml-0 lg:ml-13 text-gray-700 leading-relaxed">
              <p>
                Our blog posts may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content or privacy practices of any third-party sites.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">6</span>
              Data Security
            </h2>
            <div className="ml-0 lg:ml-13 text-gray-700 leading-relaxed">
              <p>
                We use reasonable administrative and technical measures to protect the limited information we collect. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold flex-shrink-0">7</span>
              Children's Privacy
            </h2>
            <div className="ml-0 lg:ml-13 text-gray-700 leading-relaxed">
              <p>
                Our Site is not intended for individuals under the age of 13. We do not knowingly collect any information from children under 13. If we become aware that we have inadvertently collected information from a child under 13, we will take steps to delete it.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold flex-shrink-0">8</span>
              Changes to This Privacy Policy
            </h2>
            <div className="ml-0 lg:ml-13 text-gray-700 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective date" at the top. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className=" rounded-2xl p-6 lg:p-8 shadow-lg ">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold flex-shrink-0">9</span>
              Contact Us
            </h2>
            <div className="ml-0 lg:ml-13">
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a href="mailto:info@kloudshark.com" className="inline-flex border items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                info@kloudshark.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;