import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <div className="bg-muted py-8">
          <div className="container m-auto px-4 md:px-6">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold  mb-6">
                About Roamploy
              </h2>
              <p className="text-lg md:text-xl mb-4">
                Roamploy is a global platform based in Lagos, Nigeria,
                transforming how the world works remotely. We connect skilled
                professionals with forward-thinking companies, creating career
                opportunities beyond borders.
              </p>
              <p className="text-lg md:text-xl mb-4">
                Our mission is simple: empower individuals to work from anywhere
                and help businesses tap into exceptional global talent. Through
                smart technology, we make it easy for job seekers to build
                standout profiles, find curated remote roles, and engage
                directly with employers.
              </p>
              <p className="text-lg md:text-xl mb-4">
                For companies, we provide powerful tools to post vetted
                listings, streamline hiring, and manage distributed teams with
                confidence.
              </p>
              <p className="text-lg md:text-xl">
                With a strong focus on trust, transparency, and inclusivity,
                Roamploy is more than a job board—we&apos;re building a remote-first
                future. Join the movement at{" "}
                <a
                  href="https://www.roamploy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  roamploy.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
