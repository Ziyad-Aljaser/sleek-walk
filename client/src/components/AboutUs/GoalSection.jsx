import React, { forwardRef } from "react";
import goal_img from "../../assets/goal_img.png";
import { Link } from "react-router-dom";

const GoalSection = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="hero sm:py-16 bg-base-300">
      <div className="hero-content grid md:grid-cols-2 gap-8">
        <div className="hidden md:block">
          <img src={goal_img} alt="Goal" />
        </div>
        <div>
          <h1 className="text-5xl font-bold leading-normal">Our Goal</h1>
          <div className="block md:hidden">
            <img src={goal_img} alt="Goal" className="w-1/2 h-auto mx-auto" />
          </div>
          <p className="py-6 text-xl sm:text-3xl">
            To revolutionize the online shoe shopping experience by offering
            exceptional value, a diverse range of styles, and a commitment to
            preserving the local essence of our streets. At Sleek Walk, we aim
            to not just be another online store but a movement that champions
            community, style, and value in every step you take
          </p>
          <Link to={"/"} className="btn btn-primary mt-4">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
});

export default GoalSection;
