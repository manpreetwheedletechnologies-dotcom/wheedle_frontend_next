'use client';
import React from "react";

function AboutTeam() {
  const teamMembers = [
    {
      image: "/Term1.png",
      name: "Eleanor Pena",
      role: "UI UX Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Term2.png",
      name: "Jenny Wilson",
      role: "President of Sales",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Term3.png",
      name: "Floyd Miles",
      role: "Marketing Coordinator",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Image3.png",
      name: "Leslie Alexander",
      role: "Web Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Meet Our
            </h2>
            <h2 className="text-4xl lg:text-5xl font-bold italic text-white mb-6">
              Team Members
            </h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
              With deep industry knowledge and a commitment to excellence, we transform ideas into reliable,
              high-performing digital products that deliver real business value.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center lg:text-left">
                {/* Image */}
                <div className="relative mb-4">
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur-lg"></div>
                  <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 h-64 lg:h-72">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-blue-400 mb-3">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;
