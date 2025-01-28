module.exports = (mongoose) => {
  const UserActivitySchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        ref: 'User' // Reference to User model
      },
      email: {
        type: String,
        required: [true, "Email is required"]
      },
      ipAddress: {
        type: String,
        required: [true, "IP Address is required"]
      },
      userAgent: {
        type: String,
        required: [true, "User Agent is required"]
      },
      browser: {
        type: String,
        default: null
      },
      os: {
        type: String,
        default: null
      },
      device: {
        type: String,
        default: null
      },
      location: {
        country: {
          type: String,
          default: null
        },
        city: {
          type: String,
          default: null
        },
        timezone: {
          type: String,
          default: null
        }
      },
      action: {
        type: String,
        required: [true, "Action is required"],
        enum: ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'REGISTER'] // Define allowed actions
      },
      path: {
        type: String,
        required: [true, "Path is required"]
      },
      meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      }
    },
    {
      timestamps: true // This will add createdAt and updatedAt fields
    }
  );

  return mongoose.model("UserActivity", UserActivitySchema);
};
