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

    if (typeof module !== "string" || module.length <= 2) {
      return res.status(400).send({
        success: false,
        message: "Modulo deve ser do tipo string e conter 3 caracteres.",
      });
    }

    if (typeof note !== "number" || note < 0 || note > 10) {
      return res.status(400).send({
        success: false,
        message: "Note deve ser do tipo number e um valor entre 0 e 10.",
      });
    }

    const newAssessment = await assessmentService.create({
      module,
      note,
      idUser: id,
    });

    if (!newAssessment) {
      return res
        .status(404)
        .send({ success: false, message: "Erro ao criar avaliação." });
    }

    return res.status(201).send({
      success: true,
      message: "Avaliação criada com sucesso.",
      data: newAssessment,
    });
  }
}

export default AssessmentController;
