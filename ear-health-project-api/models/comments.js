//importing necessary dependencies
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Comments {
  //function to post a comment under a specific forum post
  static async postComment(data) {
    //required input fields to create a comment
    const requiredFields = ["content", "is_anonymous"];

    //check if each field is filled out
    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    //create the user query that will insert the comment into the db
    const commentQuery = `
    INSERT INTO comments (post_id , user_id, username, content, is_anonymous)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `

    //values that we will put into the query 
    const values = [data.post_id, data.user_id, data.username, data.content, data.is_anonymous]

    //insert the actual comment into the db and return
    const result = await db.query(commentQuery,values)

    return result.rows[0]

  }

  static async loadAllForumComments(forumID) {

    //check if the forumID is properly passed
    if (!forumID) {
        throw new BadRequestError("No id provided")
    }

    //select from comments db wher the post id matches the post id given
    const createUserQuery = `SELECT * FROM comments WHERE post_id = $1`

    const result = await db.query(createUserQuery, [forumID])

    return result.rows

  }
}

module.exports = Comments;
