import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

import { ComputerType } from './computerType';

import ComputerModel from '../models/computers';

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            computers: {
                type: new GraphQLList(ComputerType),
                args: {
                    mark: {
                        description: 'The mark of computer',
                        type: GraphQLString
                    }
                },
                resolve: (root, {mark}) => {
                    return new Promise((resolve, reject) => { // move this to separate file for manipulate data from db
                        ComputerModel.find({}, function(err, docs) {
                            if(err) {
                                reject({error: err});
                            } else {
                                if (mark) {
                                    const brand = mark.trim().toLowerCase();

                                    docs = docs.filter(pc => pc.mark.toLowerCase() === brand);
                                }

                                resolve(docs);
                            }
                        });
                    });
                }
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            insertComputer: {
                type: ComputerType,
                args: {
                    mark: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The mark of computer',
                    },
                    model: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The model of computer',
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The color of computer'
                    },
                    wifi: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The type of wifi'
                    },
                    isLaptop: {
                        type: new GraphQLNonNull(GraphQLBoolean),
                        description: 'The computer is laptop'
                    },
                    diagonal: {
                        type: new GraphQLNonNull(GraphQLFloat),
                        description: 'The monitor diagonal'
                    },
                    coresNumber: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The cpu core count'
                    },
                    usb2: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The usb2 ports count'
                    },
                    usb3: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The usb3 ports count'
                    },
                    ram: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The ram capacity'
                    },
                    memory: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The memory capacity'
                    },
                    videocard: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The type of video card in computer'
                    },
                    videomemory: {
                        type: new GraphQLNonNull(GraphQLInt),
                        description: 'The video memory capacity computer'
                    },
                    processor: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The type of processor in computer'
                    },
                    operatingSystem: {
                        type: new GraphQLNonNull(GraphQLString),
                        description: 'The OS on computer'
                    },
                    price: {
                        type: new GraphQLNonNull(GraphQLFloat),
                        description: 'The price of computer'
                    }
                },
                resolve: (obj, newComputer ) => {
                    return new Promise((resolve, reject) => { // Also must be moved to separate file, like and query
                        const newComputerModel = new ComputerModel(newComputer);

                        newComputerModel.save(function(err, docs) {
                            if(err) {
                                console.log('error: ', err);
                                reject({error: err});
                            }
                            else {
                                resolve(newComputerModel);
                            }
                        });
                    });
                }
            }
        }
    })
});

export default schema;
