import { publisher, publisherModel } from "../../models/publisher";
import db from "../../database";

const publisherM = new publisherModel();

describe("publisher Model", ()=> {
    const publisher = {
        p_name: 'El-Shroq', 
        p_address: 'Cairo', 
        phone: '0245698712'} as publisher

        beforeAll(async () => {
            const createdPublisher = await publisherM.create(publisher);
            publisher.id = createdPublisher.id;
        });
    afterAll(async () => {
        const conn = await db.connect()
        // sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        let sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    });
    it('Should have an index method', ()=>{
        expect(publisherM.index).toBeDefined();
    });
    it('create method should add new publisher', async() => {
        const result = await publisherM.create({
        p_name: 'Egypt Library', 
        p_address: 'Cairo', 
        phone: '0232145698'});
        expect(result).toEqual({
            id: 2,
            p_name: 'Egypt Library', 
            p_address: 'Cairo', 
            phone: '0232145698'
        });
    });
    it('Index method should return a list of publishers', async() => {
        const result = await publisherM.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('showById method should return one publisher with the same id', async() => {
        const result = await publisherM.showById('1');
        expect(result.id).toBe(1);
        expect(result.p_name).toBe('El-Shroq');
        expect(result.p_address).toBe('Cairo');
        expect(result.phone).toBe('0245698712');
    });
  
    it('updateById method should return one publisher with new data', async() => {
        const result = await publisherM.updateById({... publisher,            
                p_address: 'Gizaa', 
        id: 1});
        expect(result.id).toBe(1);
        expect(result.p_name).toBe(publisher.p_name);
        expect(result.p_address).toBe('Gizaa');
        expect(result.phone).toBe(publisher.phone);
                
        });    
  
    it('deleteById method should remove one publisher with the same id', async() => {
        publisherM.deleteById('1');
        const result = await publisherM.index();
        expect(result.length).toBeGreaterThan(0);
    });
    
});