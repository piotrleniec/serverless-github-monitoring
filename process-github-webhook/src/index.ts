interface Event {}
interface Context {}
interface Response {}

export const handler = async (_event: Event, _context: Context): Promise<Response> => {
  return { statusCode: 204 }
}
