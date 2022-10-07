import { getToken } from "next-auth/jwt"

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token) {
    res.json({status: false})
  } else {
    try {
      const email = token.email
      const amount = req.query.amount
      const resp = await fetch(`http://127.0.0.1:5000/add-funds?email=${email}&amount=${amount}`).then(res => res.json())
      res.json(resp)
    } catch (err) {
      res.json({status: false})
    }
  }
}