export default async ({ sequelize }) => {
    await sequelize.models.User.bulkCreate([
        {
            name: 'ali',
            company: 'Nolbir',
            role: 'employee',
            password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            email: 'ali@gmail.com'
        },
        {
            name: 'nosir',
            company: undefined,
            role: 'employee',
            password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            email: 'nosir@gmail.com'
        },
        {
            name: 'halil',
            company: 'Layyan',
            role: 'employer',
            password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            email: 'halil@gmail.com'
        },
        {
            name: 'ulugbek',
            company: undefined,
            role: 'admin',
            password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
            email: 'ulugbekyolchimurodov@gmail.com'
        }
    ])

    await sequelize.models.Job.bulkCreate([
        {
            title: 'Frontend Developer',
            company: 'Nolbir',
            description: 'We are looking for a Frontend Developer to join our team. You will be responsible for building the ‘client-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re also familiar with Agile methodologies and are passionate about the latest front-end technologies and frameworks, we’d like to meet you. Ultimately, you will help us build and maintain functional and stable web applications.',
            location: 'Buxoro',
            experience: '1-5',
            salary: '800$',
            type: 'full-time',
            category: 'IT',
            skills: 'HTML, CSS, JavaScript, React, Redux, Node.js, Express.js, MongoDB, Git, REST API, Agile Methodologies',
            requirements: 'BSc degree in Computer Science, Engineering or a related subject',
            time: '04-07-2022',
            status: 'active'
        },
        {
            title: 'Node.js Backend Developer',
            company: 'Layyan',
            description: 'We are looking for a Backend Developer to join our team. You will be responsible for building the ‘server-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re also familiar with Agile methodologies and are passionate about the latest back-end technologies and frameworks, we’d like to meet you. Ultimately, you will help us build and maintain functional and stable web applications.',
            location: 'Tashkent',
            experience: '1-3',
            salary: '500$',
            type: 'full-time',
            category: 'IT',
            skills: 'HTML, CSS, JavaScript, React, Redux, Node.js, Express.js, MongoDB, Git, REST API, Agile Methodologies',
            requirements: 'BSc degree in Computer Science, Engineering or a related subject',
            time: '04-07-2022',
            status: 'active'
        },
        {
            title: 'Full Stack Developer',
            company: 'Nolbir',
            description: 'We are looking for a Full Stack Developer to join our team. You will be responsible for building the ‘client-side’ and ‘server-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re also familiar with Agile methodologies and are passionate about the latest front-end and back-end technologies and frameworks, we’d like to meet you. Ultimately, you will help us build and maintain functional and stable web applications.',
            location: 'Xorazm',
            experience: '3-5',
            salary: '1000$',
            type: 'part-time',
            category: 'IT',
            skills: 'HTML, CSS, JavaScript, React, Redux, Node.js, Express.js, MongoDB, Git, REST API, Agile Methodologies',
            requirements: 'BSc degree in Computer Science, Engineering or a related subject',
            time: '04-07-2022',
            status: 'active'
        }
    ])

}