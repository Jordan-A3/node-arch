import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/students";
import { InMemoryChallengeRepository } from "../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../tests/repositories/in-memory-students-repository";
import { createChallengeSubmission } from "./create-challenge-submission"

describe('Create challenge submission use  case', () => {
    it('should be able to create a ne challenge submission', async () => {
        const studentsRepository = new InMemoryStudentsRepository
        const challengesRepository = new InMemoryChallengeRepository

        const student = Student.create({
            name: "Ananda",
            email: "ananda.queiroz50@gmail.com"
        })

        const challenge = Challenge.create({
            title: "Challenge 01",
            instructionURL: 'http://example.com'
        })

        studentsRepository.items.push(student)
        challengesRepository.items.push(challenge)

        const sut = new createChallengeSubmission(
            studentsRepository,
            challengesRepository
        );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id
        })

        expect(response).toBeTruthy()
    })
})