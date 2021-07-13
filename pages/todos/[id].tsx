import React from 'react'
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify'
import { GetServerSideProps } from 'next'
import awsExports from '../../src/aws-exports'
import { getTodo } from '../../src/graphql/queries'
import { Todo } from '../../src/API'
import Layout from '../../components/Layout'
import { PaperClipIcon } from '@heroicons/react/solid'

Amplify.configure({ ...awsExports, ssr: true })

export const getServerSideProps: GetServerSideProps = async context => {
	const SSR = withSSRContext(context)
	const { id } = context.params
	const response = await SSR.API.graphql({
		query: getTodo,
		variables: { id },
	})

	console.log(JSON.stringify(response))
	return {
		props: {
			todo: response.data.getTodo,
		},
	}
}

export default function TodoConponent({ todo }: { todo: Todo }) {
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
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Attachments</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								<ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
									<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
										<div className="w-0 flex-1 flex items-center">
											<PaperClipIcon
												className="flex-shrink-0 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
											<span className="ml-2 flex-1 w-0 truncate">
												resume_back_end_developer.pdf
											</span>
										</div>
										<div className="ml-4 flex-shrink-0">
											<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
												Download
											</a>
										</div>
									</li>
									<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
										<div className="w-0 flex-1 flex items-center">
											<PaperClipIcon
												className="flex-shrink-0 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
											<span className="ml-2 flex-1 w-0 truncate">
												coverletter_back_end_developer.pdf
											</span>
										</div>
										<div className="ml-4 flex-shrink-0">
											<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
												Download
											</a>
										</div>
									</li>
								</ul>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</Layout>
	)
}
