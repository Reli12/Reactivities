using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    //this is logic for geting One specific activity 
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _contex;

            public Handler(DataContext contex)
            {
                this._contex = contex;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _contex.Activities.FindAsync(request.Id);
            }
        }
    }
}