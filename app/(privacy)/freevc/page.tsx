import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            <p className="mb-3 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                Effective Date: November 24, 2024
            </p>
            <div className="text-left space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Data Collection</h2>
                <p>
                    The Free VC app does not collect or store any personal information from its users. This application is provided for entertainment purposes and all functionalities are accessible without the need for personal data.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third Party Services</h2>
                <p>
                    Although Free VC does not collect any personal information, we may use third party services that utilize their own separate and independent privacy policies. These services may collect information used to help them secure or improve their services. Here is a link to the privacy policy of a third-party service provider used by the Application:
                </p>
                <ul className="list-disc list-inside">
                    <li><a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Play Services</a></li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Children’s Privacy</h2>
                <p>
                    Our application does not address anyone under the age of 13. We do not knowingly engage or communicate with children under the age of 13.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h2>
                <p>
                    We are committed to ensuring the security of any information that may be collected by third-party services used by our app.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the application after any changes or revisions to this Privacy Policy shall indicate your agreement with the terms of such revised Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                <p>
                    If you have any questions or concerns about our Privacy Policy, please contact us at:
                </p>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 border border-blue-400">
                    Email: kumar.adamya2000@gmail.com
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 border border-blue-400">
                    Phone: 7017368626
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 border border-blue-400">
                    Address: S-101 Shivalik Nagar BHEL Ranipur Haridwar, India
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
