import React from 'react';
import Navigation from '../components/Navigation';

const CookiePolicy = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navigation />
      <div className="max-w-[1350px] mx-auto px-4 sm:px-10 pt-24 lg:pt-32 pb-16">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <div className="flex items-center gap-2 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Effective date: October 22, 2025</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {/* 1. Introduction */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                1
              </span>
              Introduction
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to Kloudshark ("we," "us," or "our"). This Cookie Policy
                explains how we use cookies and similar technologies when you
                visit our website{' '}
                <a
                  href="https://blog-website-8yru.vercel.app/"
                  className="text-blue-600 hover:underline font-medium"
                >
                  blog-website-8yru.vercel.app
                </a>{' '}
                (the "Site").
              </p>
            </div>
          </section>

          {/* 2. What Are Cookies? */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                2
              </span>
              What Are Cookies?
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Cookies are small text files stored on your device by your web
                browser. They allow websites to recognize your device, remember
                your preferences, and provide a better user experience.
              </p>
            </div>
          </section>

          {/* 3. How We Use Cookies */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold flex-shrink-0">
                3
              </span>
              How We Use Cookies
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Authentication:</strong> When a user logs in, we store
                  a token in cookies so that the user stays logged in for 7 days.
                  This helps you remain authenticated without having to log in
                  repeatedly.
                </li>
                <li>
                  <strong>Analytics:</strong> We use cookies to understand how
                  visitors interact with our Site, which blog posts are popular,
                  and how many visitors we receive. This helps us improve our
                  content and user experience.
                </li>
                <li>
                  <strong>Security:</strong> Cookies help us identify and prevent
                  suspicious activity, protect against unauthorized access, and
                  maintain the security of the Site.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Types of Cookies We Use */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                4
              </span>
              Types of Cookies We Use
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Session Cookies:</strong> These cookies are temporary
                  and deleted once you close your browser. They help the Site
                  remember your session while navigating between pages.
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These cookies remain on
                  your device for a set period of time. Our login token cookie
                  is persistent and lasts for 7 days.
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> We may use analytics
                  tools (like Google Analytics) that place cookies to track site
                  performance and visitor behavior.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Managing Cookies */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold flex-shrink-0">
                5
              </span>
              Managing Cookies
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                You can control or delete cookies through your browser settings.
                Please note that if you disable cookies, some features of the
                Site may not work properly, including staying logged in.
              </p>
            </div>
          </section>

          {/* 6. Changes to This Cookie Policy */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                6
              </span>
              Changes to This Cookie Policy
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may update this Cookie Policy from time to time. Changes will
                be posted on this page with an updated "Effective date." We
                encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          {/* 7. Contact Section */}
          <section className="rounded-2xl p-6 lg:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold flex-shrink-0">
                7
              </span>
              Contact Us
            </h2>
            <div className="ml-0 lg:ml-13">
              <p className="mb-4 text-gray-700 leading-relaxed">
                If you have any questions about this Cookie Policy, please
                contact us at:
              </p>
              <a
                href="mailto:info@kloudshark.com"
                className="inline-flex border items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                info@kloudshark.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;