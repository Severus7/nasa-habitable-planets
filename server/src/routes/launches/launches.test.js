const request = require('supertest');
const app = require('../../app.js');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(response.statusCode).toBe(200);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: "Josh Enterprise",
        rocket: "Apollo-272",
        target: "Kepler-442 b",
        launchDate: "February 7, 2028",
    };

    const launchDataWithoutDate = {
        mission: "Josh Enterprise",
        rocket: "Apollo-272",
        target: "Kepler-442 b"
    };

    const launchDataWithInvalidDate = {
        mission: "Josh Enterprise",
        rocket: "Apollo-272",
        target: "Kepler-442 b",
        launchDate: "eleven years from now",
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        });
    });

    test('It should catch invalid dates',async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });
    });
})