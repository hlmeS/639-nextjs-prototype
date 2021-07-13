import React from 'react'
import { Amplify, withSSRContext } from 'aws-amplify'
import { GetServerSideProps } from 'next'
import awsExports from '../../src/aws-exports'
import { getTodo } from '../../src/graphql/queries'
import { Todo } from '../../src/API'
import Layout from '../../components/Layout'

Amplify.configure({ ...awsExports, ssr: true })

export const getServerSideProps: GetServerSideProps = async context => {
	const SSR = withSSRContext(context)
	const { id } = context.params
	const response = await SSR.API.graphql({
		query: getTodo,
		variables: { id },
	})

	return {
		props: {
			todo: response.data.getTodo,
		},
	}
}

export default function TodoConponent({ todo }: { todo: Todo }): React.ReactNode {
	return (
		<Layout>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">Todo ID</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">{todo.id}</p>
				</div>
				<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl className="sm:divide-y sm:divide-gray-200">
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Name</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{todo.name}</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Description</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{todo.description}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Created at</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{todo.createdAt}</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Updated at </dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{todo.updatedAt}</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">About</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
								consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
								nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
								reprehenderit deserunt qui eu.
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</Layout>
	)
}
