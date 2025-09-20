import { useState } from "react";

function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "student",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("❌ Passwords do not match!");
      return;
    }
    alert(`✅ Registered as ${form.username} (${form.role})`);
    onSwitchToLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Card Container */}
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md fade-in-up">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600">
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600">
              Email
            </label>
          </div>

          {/* Role */}
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white/60 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="artist">Artist</option>
              <option value="ux_ui">UX/UI</option>
              <option value="marketer">Marketer</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600">
              Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600">
              Confirm Password
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:scale-[1.02] transition-transform"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-sm mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
