import repository from "../database/prisma.databe";

class AssessmentService {
  public async findAll(idUser: string) {
    const assessments = await repository.assessment.findMany({
      where: { idUser },
    });

    return assessments;
  }

  public async create(data: any) {
    const newAssessment = await repository.assessment.create({
      data: { ...data },
    });

    return newAssessment;
  }
}

export default new AssessmentService();
