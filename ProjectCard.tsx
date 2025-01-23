// ...existing code...
<div 
  className="grid grid-cols-[1fr,120px] gap-3 items-center justify-items-end w-full px-4 cursor-pointer" 
  onClick={() => onExpand(project.id)}
>
  <motion.div
    className="relative aspect-video w-full max-w-sm"
    whileHover={{ scale: 0.98 }}
  >
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  </motion.div>

  <div className="text-right">
    <h3 className="text-sm font-medium">{project.title}</h3>
    <p className="text-xs text-gray-600 mt-1">
      {project.location}
    </p>
  </div>
</div>
// ...existing code...
