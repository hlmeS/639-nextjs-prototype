// pages/index.js
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"
import { Amplify, API, Auth, withSSRContext } from "aws-amplify"
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import Head from "next/head"
import awsExports from "../src/aws-exports"
import { createTodo } from "../src/graphql/mutations"
import { listTodos } from "../src/graphql/queries"
import styles from "../styles/Home.module.css"
import Layout from "../components/Layout"
import { GetServerSideProps } from 'next'
import React from "react"
import { CreateTodoMutation, CreateTodoMutationVariables, Todo } from "../src/API";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const SSR = withSSRContext({ req });
	const response = await SSR.API.graphql({ query: listTodos });

	return {
		props: {
			todos: response.data.listTodos.items,
		},
	};
}

const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();

	const form = new FormData(event.currentTarget);

	try {
		console.log("etaetaet")
		const variables: CreateTodoMutationVariables = {
			input: {
				name: String(form.get("name")),
				description: String(form.get("description")),
			}
		}

		const result = await API.graphql({
			authMode: GRAPHQL_AUTH_MODE.API_KEY,
			query: createTodo,
			variables,
		});

		console.log(JSON.stringify(result))

		if ('data' in result && result.data ) {
			const data = result.data as CreateTodoMutation
			console.log(JSON.stringify(data))
			window.location.href = `/todos/${data.createTodo.id}`;
		}

	} catch ({ errors }) {
		console.error(...errors);
		throw new Error(errors[0].message);
	}
}

const Home = ({ todos = [] }: { todos: Todo[] }) => {
	return (
		<Layout>
			<div className={styles.container}>
				<Head>
					<title>Amplify + Next.js</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<h1 className={styles.title}>Amplify + Next.js</h1>

					<p className={styles.description}>
						<code className={styles.code}>{todos.length}</code>
						posts
					</p>

					<div className={styles.grid}>
						{todos.map((todo) => (
							<a className={styles.card} href={`/todos/${todo.id}`} key={todo.id}>
								<h3>{todo.name}</h3>
								<p>{todo.description}</p>
							</a>
						))}

						<div className={styles.card}>
							<h3 className={styles.title}>New Todo</h3>
							<form onSubmit={handleCreateTodo}>
								<fieldset>
									<legend>Name</legend>
									<input
										defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
										name="name"
									/>
								</fieldset>

								<fieldset>
									<legend>Description</legend>
									<textarea
										defaultValue="I have to build an Amplify app with Next.js!"
										name="description"
									/>
								</fieldset>

								<button>Create Todo</button>
								<button type="button" onClick={() => Auth.signOut()}>
									Sign out
								</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		</Layout>
	);
}

export default Home
