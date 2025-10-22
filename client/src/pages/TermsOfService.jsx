import React from "react";
import Navigation from "../components/Navigation";

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navigation />
      <div className="max-w-[1350px] mx-auto px-4 sm:px-10 pt-24 lg:pt-32 pb-16">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
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
            <span className="font-medium">Effective date: December 17, 2024</span>
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
                Welcome to <strong>KloudShark</strong>. These Terms of Service
                (“Terms”) govern your access to and use of our website and any
                related services. By accessing or using KloudShark, you agree to
                be bound by these Terms and our Privacy Policy. If you do not
                agree, please do not use the website.
              </p>
            </div>
          </section>

          {/* 2. About KloudShark */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                2
              </span>
              About KloudShark
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KloudShark is a blogging platform where only authorized admins
                can post blogs. Registered or unregistered users may browse and
                read blogs but cannot comment, edit, or publish content. The
                content posted on KloudShark represents the views of the
                respective authors and not necessarily of the website or its
                team.
              </p>
            </div>
          </section>

          {/* 3. Eligibility */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold flex-shrink-0">
                3
              </span>
              Eligibility
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                By accessing KloudShark, you confirm that you are at least 13
                years old and have the legal capacity to agree to these Terms. If
                you are accessing on behalf of an organization, you represent
                that you have authority to bind that organization to these
                Terms.
              </p>
            </div>
          </section>

          {/* 4. Use of the Website */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                4
              </span>
              Use of the Website
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Use the website for any illegal or unauthorized purpose.</li>
                <li>
                  Copy, modify, or distribute content from KloudShark without
                  prior written permission.
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the
                  website, server, or database.
                </li>
                <li>
                  Upload or transmit any malware, viruses, or harmful code.
                </li>
                <li>
                  Use any automated system or software to extract data
                  (“scraping”) from KloudShark without authorization.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Content Ownership */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold flex-shrink-0">
                5
              </span>
              Content Ownership
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                All content posted by KloudShark’s admins, including articles,
                text, images, and designs, is the property of KloudShark or the
                respective authors and is protected by copyright laws. Users are
                not permitted to copy, modify, or redistribute content without
                explicit permission.
              </p>
            </div>
          </section>

          {/* 6. User Accounts */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                6
              </span>
              User Accounts
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Users may access the website without creating an account.
                Administrative accounts are granted only by KloudShark. Admins
                are responsible for maintaining the confidentiality of their
                login credentials and for all activities under their account.
                KloudShark reserves the right to suspend or terminate admin
                access for violation of these Terms or misuse of the platform.
              </p>
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold flex-shrink-0">
                7
              </span>
              Limitation of Liability
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KloudShark provides all content “as is” without warranties of
                any kind. We do not guarantee that the website will always be
                available, error-free, or secure. To the fullest extent
                permitted by law, KloudShark is not liable for any direct,
                indirect, incidental, or consequential damages resulting from
                the use or inability to use our website.
              </p>
            </div>
          </section>

          {/* 8. Privacy */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold flex-shrink-0">
                8
              </span>
              Privacy
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Your use of KloudShark is also governed by our Privacy Policy,
                which explains how we collect, use, and protect your
                information. By using our website, you consent to such data
                practices.
              </p>
            </div>
          </section>

          {/* 9. Intellectual Property */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold flex-shrink-0">
                9
              </span>
              Intellectual Property
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                The name “KloudShark,” logo, and all associated visual elements
                are trademarks or service marks owned by KloudShark. You may not
                use these trademarks without prior written approval.
              </p>
            </div>
          </section>

          {/* 10. Changes to Terms */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                10
              </span>
              Changes to Terms
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                KloudShark reserves the right to modify or update these Terms at
                any time. Updated Terms will be posted on this page with the
                “Effective Date” revised. Your continued use of the website
                constitutes acceptance of the updated Terms.
              </p>
            </div>
          </section>

          {/* 11. Termination */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                11
              </span>
              Termination
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may restrict, suspend, or terminate access to the website
                without notice if you violate these Terms or engage in
                activities that harm KloudShark or its users. Sections
                concerning intellectual property, limitation of liability, and
                governing law will survive termination.
              </p>
            </div>
          </section>

          {/* 12. Governing Law */}
          <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold flex-shrink-0">
                12
              </span>
              Governing Law
            </h2>
            <div className="ml-0 lg:ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                These Terms are governed by and construed in accordance with the
                laws of India. Any disputes arising from or relating to these
                Terms shall be subject to the exclusive jurisdiction of the
                courts located in Punjab, India.
              </p>
            </div>
          </section>

          {/* 13. Contact Section */}
          <section className="rounded-2xl p-6 lg:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold flex-shrink-0">
                13
              </span>
              Contact Us
            </h2>
            <div className="ml-0 lg:ml-13">
              <p className="mb-4 text-gray-700 leading-relaxed">
                If you have any questions or concerns regarding these Terms,
                please contact us at:
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

export default TermsOfService;