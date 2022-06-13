import { author, authorModel } from "../../models/author";
import db from "../../database";

const authorM = new authorModel();

describe("Author Model", () => {
  const author = {
    name:'Ahmed Bahget'
  } as author

  
    afterAll(async () => {
        const conn = await db.connect()
        let sql = 'DELETE FROM orders_details; \nALTER SEQUENCE orders_details_id_seq RESTART WITH 1;';
        await conn.query(sql);
        // sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        
        sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        // sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        // sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        // sql = 'DELETE FROM authors Where id in (select author_id from books); delete from books; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
        sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    });

    it('Should have an index method', () => {
        expect(authorM.index).toBeDefined();
    });
    
    it('Create method should return a New Author', async () => {
        const createdAuthor = await authorM.create({
          name: 'Ahmed Bahget',
          
        } as author)
        expect(createdAuthor).toEqual({
          id: createdAuthor.id,
          name: 'Ahmed Bahget'
        } as author)
      })    

    it('Index method should return a list of authors', async () => {
        const result = await authorM.index();
        // expect(result).toEqual([{
        //     id: 1,
        //     name: "Ahmed Bahget"
        // }]);
        expect(result.length).toBe(1);
    });

    it('ShowById method should return one author with the same id', async() => {
      const result = await authorM.showById('1');
      expect(result.id).toBe(1);
      expect(result.name).toBe(author.name);
  });

  it('Update method should return one author with new data', async() => {
      const result = await authorM.updateById({... author, 
      name: 'Ahmed Sh. Bahget',
      id: 1});
      expect(result.id).toBe(1);
      expect(result.name).toBe('Ahmed Sh. Bahget');
              
      });    

  it('Delete method should remove one author with the same id', async() => {
      authorM.deleteById(author.id as unknown as string);
      const result = await authorM.index();
      expect(result).toEqual([]);
  });

});