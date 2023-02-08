import { readFileSync, writeFileSync } from "fs";

export default function handler(req, res) {
  const { classid, rollno, attended } = req.query;
  try {
    const data = readFileSync(`src/components/Data/${rollno}.json`);
    const json = JSON.parse(data);
    if (json.classes.some(e => e.class_id === classid)) {
      let index;
      json.classes.find((c, i) => {
        if (c.class_id === classid) {
          index = i;
          return i;
        }
      })
      json.classes[index].total_classes += 1
      if (attended === '1') json.classes[index].attended_classes += 1
      writeFileSync(`src/components/Data/${rollno}.json`, JSON.stringify(json, null, 2))
      res.status(200).json(json);
    } else {
      res.status(401).json({ error: 'Student not enrolled in that class.' });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Student with specified roll number not found.' })
  }
}
