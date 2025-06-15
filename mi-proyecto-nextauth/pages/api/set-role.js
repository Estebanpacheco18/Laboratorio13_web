import { roles } from "../../lib/roles";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, role } = req.body;
    roles[email] = role;
    res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    res.status(200).json(roles);
  } else {
    res.status(405).end();
  }
}