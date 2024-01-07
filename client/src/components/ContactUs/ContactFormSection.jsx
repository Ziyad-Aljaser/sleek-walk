import React from "react";

const ContactFormSection = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl mt-4 sm:mt-0">
      <div className="card-body">
        {/* <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1> */}

        <div className="flex flex-col md:flex-row gap-4">
          {" "}
          {/* flex container */}
          <div className="form-control flex-grow">
            {" "}
            {/* flex item */}
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="name"
              placeholder="full name"
              className="input input-bordered input-primary"
            />
          </div>
          <div className="form-control flex-grow">
            {" "}
            {/* flex item */}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-primary"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            placeholder="your message here..."
            className="input input-bordered input-primary w-full h-32"
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
