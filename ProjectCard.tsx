// ...existing code...
<div 
  className="grid grid-cols-[120px,1fr] gap-[5px] items-center w-full px-4 cursor-pointer" 
  onClick={() => onExpand(project.id)}
>
  <div className="text-left">
    <h3 className="text-sm font-medium">{project.title}</h3>
    <p className="text-xs text-gray-600 mt-1">
      {project.location}
    </p>
  </div>

  <motion.div
    className="relative aspect-video w-full max-w-sm justify-self-end"
    whileHover={{ scale: 0.98 }}
  >
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>
// ...existing code...
