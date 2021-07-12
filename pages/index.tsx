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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="flow-root mt-6">
					<p>{todos.length} todos </p>
					<ul className="-my-5 divide-y divide-gray-200">
						{todos.map((todo) => (
							<li key={todo.id} className="py-5">
								<div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
									<h3 className="text-sm font-semibold text-gray-800">
										<a href={`/todos/${todo.id}`} key={todo.id} className="hover:underline focus:outline-none">
											{/* Extend touch target to entire panel */}
											<span className="absolute inset-0" aria-hidden="true" />
											{todo.name}
										</a>
									</h3>
									<p className="mt-1 text-sm text-gray-600 line-clamp-2">{todo.description}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="flow-root mt-12">
					<form onSubmit={handleCreateTodo} className="space-y-8 divide-y divide-gray-200">
						<div className="space-y-8 divide-y divide-gray-200">
							<div>
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">Create Todo</h3>
									<p className="mt-1 text-sm text-gray-500">
										Create a new Todo by entering a name and description.
									</p>
								</div>
								<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
									<div className="sm:col-span-4">
										<label htmlFor="name" className="block text-sm font-medium text-gray-700">
											Name
										</label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<input
												type="text"
												name="name"
												id="name"
												className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
											/>
										</div>
									</div>

									<div className="sm:col-span-6">
										<label htmlFor="description" className="block text-sm font-medium text-gray-700">
											Description
										</label>
										<div className="mt-1">
											<textarea
												id="description"
												name="description"
												rows={3}
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
												defaultValue={''}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="pt-5">
							<div className="flex justify-end">
								<button
									type="button"
									className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Save
								</button>
							</div>
						</div>
					</form>

				</div>
			</div>

		</Layout>
	);
}

export default Home
