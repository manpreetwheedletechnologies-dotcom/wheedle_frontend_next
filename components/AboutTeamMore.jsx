'use client';
import React from "react";

function AboutTeamMore() {
  const teamMembers = [
    {
      image: "/Image1.png",
      name: "Jenny Wilson",
      role: "Nursing Assistant",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Image2.png",
      name: "Floyd Miles",
      role: "Dog Trainer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Image3.png",
      name: "Leslie Alexander",
      role: "Marketing Coordinator",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
    {
      image: "/Term1.png",
      name: "Eleanor Pena",
      role: "Medical Assistant",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-left">
                {/* Image */}
                <div className="relative mb-4">
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

export default AboutTeamMore;
