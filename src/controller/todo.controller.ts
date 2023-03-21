import express, { RequestHandler } from 'express';
import { QueryResult } from 'pg';
import dbConnect from '../db.connection';



class TodoController {
    constructor() {
        
    }

    public create: RequestHandler = async(req, res)  => {
        try {
            
            let reqbody: {
                title: string,
                description: string,
                status: string
            };
            reqbody = req.body;
            
            const {title, description, status} = reqbody;

            if (!title || !description || !status) {
                return res.status(406).json({
                    status: `failed`,
                    message: `All field must be filled`
                })
            }

            if (status !== ('Processing' || 'Completed' || 'Pending')) {
                return res.status(406).json({
                    status: `failed`,
                    message: `status value not allowed`
                })
            }

            const {rows} = await dbConnect.query(
                `INSERT INTO todo (title, description, status) VALUES ($1, $2, $3) 
                RETURNING *;`, [title, description, status]
            );
            
            return res.status(201).json({
                status: `success`,
                message: `Activity successfully added to your todo`,
                task: rows[0]
            }); 
        } catch (error: any) {
            return res.status(500).json({
                status: `failed`,
                message: error.message
            })
        }

    }

    public getAll: RequestHandler = async(req, res) => {
        try {
            const {rows} = await dbConnect.query(`SELECT * FROM todo;`);
            if (rows.length === 0) {
                return res.status(200).json({
                    status: `success`,
                    message: `You have no task on your todo list`
                })
            }
            else {
                return res.status(200).json({
                    status: `failed`,
                    message: `You have some todos on your list`,
                    todo: rows
                })
            }
        } catch (error: any) {
            return res.status(500).json({
                status: `failed`,
                message: error.message
            })
        }
    }

    /**
     * getSingle
     */
    public getSingle: RequestHandler = async(req, res) => {
       try {
        const {params: {id}} = req;

        const {rows}: QueryResult<any> = await dbConnect.query('SELECT * FROM todo WHERE id = $1;', [id]);

        if (rows.length === 0) {
            return res.status(406).json({
                status: `success`,
                message: `Todo not foun in our database`
            })
        }

        else {
            return res.status(200).json({
                status: `success`,
                message: `Todo found`,
                todo: rows[0]
            })
        }
       } catch (error: any) {
        return res.status(500).json({
            status: `failed`,
            message: error.message
        })
       }

    }

    /**
     * updateTodo
     */
    public updateTodo: RequestHandler = async(req, res)=> {
        try {
            const {params: {id}, body: {status}} = req;

            const {rows}: QueryResult<any> = await dbConnect.query('UPDATE todo SET status = $1 WHERE id = $2 RETURNING *;', [status, id])


            if (rows.length === 0) {
                return res.status(406).json({
                    status: `success`,
                    message: `Todo not foun in our database`
                })
            }

            else {
                return res.status(200).json({
                    status: `success`,
                    message: `Todo updated successfully`,
                    todo: rows[0]
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: `failed`,
                message: error.message
            })
        }
    }

    /**
     * deleteTodo = 
     */
    public deleteTodo: RequestHandler = async(req, res) => {
        try {
            const {params: {id}} = req;

            const {rows}: QueryResult<any> = await dbConnect.query('DELETE FROM todo WHERE id = $1 RETURNING *;', [id]);


            if (rows.length === 0) {
                return res.status(406).json({
                    status: `success`,
                    message: `Todo not foun in our database`
                })
            }

            else {
                return res.status(200).json({
                    status: `success`,
                    message: `Todo deleted`,
                    todo: rows[0]
                })
            }
            
        } catch (error: any) {
            return res.status(500).json({
                status: `failed`,
                message: error.message
            })
        }

    }
}

export default new TodoController();

//CREATE TABLE Todo (id BIGSERIAL PRIMARY KEY NOT NULL, title VARCHAR(50), status status);
