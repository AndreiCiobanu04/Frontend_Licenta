import React, { useEffect, useState } from "react";
import {
  addRequest,
  getProjectOwner,
  retrieveProjectById,
} from "../../services/ProjectService";
import { useParams } from "react-router-dom";
import { getAssesmentReview } from "../../services/AssesmentService";

const ProjectForStudent = ({ activeUser }) => {
  const { id } = useParams();
  const [project, setProject] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [applied, setApplied] = useState(false);
  const [review, setReview] = useState([]);
  const [scoring, setScoring] = useState([]);

  useEffect(() => {
    retrieveProjectById(id).then((response) => {
      setProject(response.data);

      getProjectOwner(response.data.professorId).then((r) => {
        setProjectOwner(r.data);
        getAssesmentReview(activeUser.id).then((r) => {
          setReview(r.data);
          calculateScoring(r.data, response.data);
        });
      });
    });
  }, []);

  function calculateScoring(review, project) {
    console.log(review);
    console.log(project);
    let kScore;
    let sScore;

    if (
      review.keywords &&
      review.keywords.length > 0 &&
      project.keywords.length > 0
    ) {
      console.log("a");
      let common = project.keywords.filter((value) =>
        review.keywords.includes(value)
      );
      console.log(common);
      kScore = common.length / project.keywords.length;
      console.log(kScore);
    }

    if (review.skills && review.skills.length > 0) {
      let common = [];
      for (let i = 0; i < project.properties.length; i++) {
        for (let j = 0; j < review.skills.length; j++) {
          if (
            project.properties[i].skillName.toLowerCase() ==
            review.skills[j].skillName.toLowerCase()
          ) {
            common.push(
              (project.properties[i].skillScore - review.skills[j].skillScore) /
                project.properties[i].skillScore
            );
          }
        }
      }
      console.log(common);
      let result = common.map((n) => (1 - n) * 100);
      sScore = 0;
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        sScore += result[i];
      }
      sScore = sScore / project.properties.length;
      console.log(sScore);
      const scoring = (kScore + sScore) / 2;
      setScoring(scoring);
    }
  }

  function sendRequest() {
    addRequest({
      applicationDate: new Date(),
      student: activeUser,
      project: project,
      status: "Request made By Student",
      scoring: scoring != [] ? scoring : 0,
    }).then((res) => setApplied(true));
  }

  return (
    <div>
      <div>Title: {project.title}</div>
      <div>Description: {project.description}</div>
      <div>Degree Type: {project.degreeType}</div>
      <div>Titular:{projectOwner} </div>
      <div>RecommendedSpecialization: {project.recommendedSpecialization}</div>
      {!applied ? (
        <button className="btn btn-success" onClick={sendRequest}>
          Apply For This Project
        </button>
      ) : (
        <div>Your request has been sent!</div>
      )}
      <button onClick={calculateScoring}>Calculate</button>
    </div>
  );
};

export default ProjectForStudent;
