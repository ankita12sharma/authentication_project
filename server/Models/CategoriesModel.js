const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageurl: { type: String, required: true },
  children: [
    {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },

      imageurl: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      children: [
        {
          name: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          imageurl: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          children: [
            {
              name: {
                type: String,
                required: true,
              },
              title: {
                type: String,
                required: true,
              },
              imageurl: {
                type: String,
                required: true,
              },
              content: {
                type: String,
                required: true,
              },
              children: [
                {
                  name: {
                    type: String,
                    required: true,
                  },
                  title: {
                    type: String,
                    required: true,
                  },
                  imageurl: {
                    type: String,
                    required: true,
                  },
                  content: {
                    type: String,
                    required: true,
                  },
                  children: [
                    {
                      name: {
                        type: String,
                        required: true,
                      },
                      title: {
                        type: String,
                        required: true,
                      },
                      imageurl: {
                        type: String,
                        required: true,
                      },
                      content: {
                        type: String,
                        required: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
module.exports = mongoose.model("categories", CategorySchema);
