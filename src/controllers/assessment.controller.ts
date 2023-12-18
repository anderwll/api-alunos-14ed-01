import { Request, Response } from "express";
import assessmentService from "../services/assessment.service";

class AssessmentController {
  public async findAll(req: Request, res: Response) {
    const { id } = req.authUser;
    const assessments = await assessmentService.findAll(id);

    return res.status(200).send({
      success: true,
      message: "Litagem de avaliações.",
      data: assessments,
    });
  }

  public async create(req: Request, res: Response) {
    const { id } = req.authUser;
    const { module, note } = req.body;

    if (!module || !note) {
      return res
        .status(400)
        .send({ success: false, message: "Preencha todos os campos!" });
    }

    const newAssessment = await assessmentService.create({ module, note });

    if (newAssessment) {
      return res.status(201).send({
        success: true,
        message: "Avaliação criada com sucesso.",
        data: newAssessment,
      });
    }
  }
}

export default AssessmentController;
